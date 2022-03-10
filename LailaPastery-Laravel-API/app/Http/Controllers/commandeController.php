<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Commande;
use App\Models\Produit;
use App\Models\Facture;
use App\Models\Livraison;
use App\Models\Promotion;
use Illuminate\Support\Carbon;
use App\Models\User;

class commandeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $commandes = Commande::with(array('produits' => function ($query) {
            $query->select()->with(['promotion', 'categorie', 'images']);
        }))->with('user')->get();

        $response = [
            "commandes" => $commandes
        ];
        return response()->json($response, 200);
    }

    public function Cart(Request $req)
    {
        $commande = Commande::where('user_id', '=', Auth()->user()->id)
            ->where('etat', '=', 'in_basket')
            ->with(array('produits' => function ($query) {
                $query->select()->with(['promotion', 'categorie', 'images']);
            }))
            ->get();
        $response = [
            "commande" => $commande
        ];
        return response()->json($response, 200);
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $commande = Commande::where('user_id', '=', Auth()->user()->id)
            ->where('etat', '=', 'in_basket')
            ->with(array('produits' => function ($query) {
                $query->select()->with(['promotion']);
            }))
            ->first();

        $produit = Produit::findOrFail($request->input('product_id'));
        $quantite = $request->input('quantite');
        foreach ($commande->produits as $produit) {
            if ($produit->id == $request->input('product_id')) {
                if ($produit->promotion == null) {
                    $prixElement = $quantite * $produit->prixProduit;
                } else {
                    $promotion = Promotion::findOrFail($produit->promotion_id);
                    $prixElement = $quantite * ($produit->prixProduit - $produit->prixProduit * $promotion->valeurPromo / 100);
                }
                $commande->produits()->sync([$request->input('product_id') => ['quantite' => $quantite, 'prixElement' => $prixElement]]);
                return response()->json($commande, 200);
            }
        }

        if ($produit->promotion == null) {
            $prixElement = $quantite * $produit->prixProduit;
        } else {
            $promotion = Promotion::findOrFail($produit->promotion_id);
            $prixElement = $quantite * ($produit->prixProduit - $produit->prixProduit * $promotion->valeurPromo / 100);
        }
        $commande->produits()->attach([$request->input('product_id') => ['quantite' => $quantite, 'prixElement' => $prixElement]]);
        return response()->json(["message" => "le produit est ajouté avec suuccés"]);
    }

    public function pay(Request $request)
    {
        // $id = $request -> input('id');

        $commande = Commande::where('user_id', '=', $request->user()->id)
        ->where('etat', '=', 'in_basket')
        ->with('produits')
        ->first();
        if ($commande) {
            $commande->etat = 'commandé';
            $commande->save();
            // Changemenet de quantité vondu
            foreach ($commande->produits as $produit) {
                $produit->uniteVendu += $produit->pivot->quantite;
                $produit->stockProduit -= $produit->pivot->quantite;
                $produit->save();
            }
            // creation d'une libvraison
            $livraison = new Livraison();
            $livraison->adresseLivraison = $request->input('adresse');
            $livraison->teleLivraison = $request->input('telephone');
            //$livraison->dateEstimeLivraison = Carbon::now()->addDays(2);
            $livraison->nomLivraison = $request->input('nom');
            $livraison->prenomLivraison = $request->input('prenom');
            $livraison->emailLivraison = $request->input('email');
            $livraison->save();
            // creation de la facture
            $facture = new Facture();
            $facture->commande_id = $commande->id;
            $facture->totalFacture = $request->input('total');
            if ($request->input('payement')) {
                $facture->payement = $request->input('payement');
            }

            $facture->livraison_id = $livraison->id;
            $facture->dateFacture = Carbon::now();
            $facture->save();
            $commande1 = new Commande();
            $commande1->user_id =  $request->user()->id;
            $commande1->save();
            $response = Facture::whereId($facture->id)->with('livraison')->get();
            return response()->json([
                "message" => "la commande est payee",
                "Facture" => $response
            ]);
        } else {
            return response()->json(["message" => "Pas de Commande trouve"], 409);
        }
    }

    public function getFacture($commande_id)
    {
        $commande = Commande::whereId($commande_id)->first();

        if ($commande->etat == "in_basket") {
            return response()->json(["message" => "la commande est pas encore payee"], 404);
        } else {
            $facture = Facture::where('commande_id', $commande_id)->with('livraison')->first();
            return response()->json(["facture" => $facture], 200);
        }
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $commande_id)
    {

        if ($request->input('method') == "delete") {
            $product_id = $request->input('product_id');
            $commande = Commande::whereId($commande_id)->with('produits')->first();
            $commande->produits()->detach($product_id);
            return response()->json(["message" => "le produit est supprimé"]);
        } else if ($request->input('method') == "update") {
            $quantite = $request->input('quantite');
            $product_id = $request->input('product_id');
            $commande = Commande::whereId($commande_id)->with('produits')->first();
            $commande->produits()->updateExistingPivot($product_id, ['quantite' => $quantite]);
            return response()->json(["message" => "le produit est mis à jour avec"]);
        } else if ($request->input('method') == "updateEtat") {
            $etat = $request->input('etat');
            $commande = Commande::whereId($commande_id)->first();
            $commande->etat = $etat;
            $commande->save();
            if($etat == "livrée") {
                $facture = Facture::where('commande_id', $commande_id)->with('livraison')->first();
                $livraison = $facture->livraison;
                $livraison->dateEstimeLivraison = Carbon::now();
                $livraison->save();
            }
            return response()->json(["message" => "L'état est mis à jour avec succés"]);
        } else {
            return response()->json(["message" => "Erreur"], 409);
        }
    }

    public function edit($id)
    {
        $commande = Commande::whereId($id)->where('user_id', '=', Auth()->user()->id)->where('etat', '=', 'in_basket')->get();
        if ($commande) {
            $commande->etat = 'commandé';
            $commande1 = new Commande();
            $commande1->user_id =  Auth()->user()->id;
            $commande1->save();
            return response()->json(["message" => "la commande est payee"]);
        } else {
            return response()->json(["message" => "Pas de Commande trouve"], 409);
        }
    }

    public function destroy($id)
    {
        Commande::findOrFail($id)->delete();
        return response()->json(["message" => "la commande est supprimee"], 200);
    }
}
