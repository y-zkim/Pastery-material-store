<?php

namespace App\Http\Controllers;

use App\Models\Facture;
use Illuminate\Http\Request;

class FactureController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $factures = Facture::with('livraison')->with(array('commande' => function ($query) {
            $query->select()->with('user')->with(array('produits' => function ($query) {
                $query->select()->with(['promotion', 'categorie', 'images']);
            }));
        }))->get();

        $response = [
            "factures" => $factures
        ];
        return response()->json($response, 200);
    }

    public function payedFactures()
    {
        $factures = Facture::with('livraison')
        ->with(array('commande' => function ($query) {
            $query->select()
            ->where('etat', '=', 'commandé')
            ->orWhere('etat', '=', 'en_traitement')
            ->with('user')
            ->with(array('produits' => function ($query) {
                $query->select()->with(['promotion', 'categorie', 'images']);
            }));
        }))->get();

        $response = [
            "factures" => $factures->where('commande', '!=', null)->values()
        ];
        return response()->json($response, 200);
    }

    public function treatedFactures()
    {
        $factures = Facture::with('livraison')
        ->with(array('commande' => function ($query) {
            $query->select()
            ->where('etat', '=', 'traité')
            ->orWhere('etat', '=', 'en_livraison')
            ->with('user')
            ->with(array('produits' => function ($query) {
                $query->select()->with(['promotion', 'categorie', 'images']);
            }));
        }))->get();

        $response = [
            "factures" => $factures->where('commande', '!=', null)->values()
        ];
        return response()->json($response, 200);
    }
    
    public function historyFactures()
    {
        $factures = Facture::with('livraison')
        ->with(array('commande' => function ($query) {
            $query->select()
            ->where('etat', '=', 'livrée')
            ->orWhere('etat', '=', 'annulé')
            ->with('user')
            ->with(array('produits' => function ($query) {
                $query->select()->with(['promotion', 'categorie', 'images']);
            }));
        }))->get();

        $response = [
            "factures" => $factures->where('commande', '!=', null)->values()
        ];
        return response()->json($response, 200);
    }
    
    public function userFactures(){
        $factures = Facture::with('livraison')
        ->with(array('commande' => function ($query) {
            $query->select()
            ->where('user_id', '=', Auth()->user()->id)
            ->where('etat', '<>', 'in_basket')
            ->with(array('produits' => function ($query) {
                $query->select()->with(['promotion', 'categorie', 'images']);
            }));
        }))->orderByDesc('created_at')->get();

        $response = [
            "factures" => $factures->where('commande', '!=', null)
        ];
        return response()->json($response, 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
