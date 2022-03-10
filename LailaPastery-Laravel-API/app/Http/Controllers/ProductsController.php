<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Produit;
use App\Models\Categorie;
use App\Models\Promotion;
use App\Models\Image;
use Illuminate\Support\Facades\Storage;

class ProductsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $produits = Produit::query()->with(['promotion', 'categorie'])
            ->with(array('images' => function ($query) {
                $query->select('produit_id', 'is_principal', 'image_content');
            }))
            ->orderBy('reference')
            ->get();
        $reponse = [
            "produits" => $produits
        ];
        return response()->json($reponse, $produits ? 202 : 404);
    }

    public function create()
    {
        $categories = Categorie::all();
        $promotions = Promotion::all();
        $table = [
            'categories' => $categories,
            'promotions' => $promotions
        ];

        return response()->json($table, 200);
    }

    public function store(Request $request)

    {
        $validated = $request->validate([
            'titre' => 'bail|required|string',
            'reference' => 'bail|required|string',
            'description' => 'bail|required',
            'stock' => 'bail|required|numeric|integer',
            'marque' => 'bail|string',
            'theme' => 'bail|string',
            'prix' => 'bail|required|numeric',
            // 'is_indesponsable' => 'required|boolean',
            'promotion_id' => 'nullable',
            'categorie_id' => 'required',
            'image' => 'image|mimes:jpeg,png,jpg,gif,svg',
            'principal_img' => 'required|image|mimes:jpeg,png,jpg,gif,svg',

        ]);


        $produit = new Produit();
        $produit->reference = $request->input('reference');
        $produit->titreProduit = $request->input('titre');
        $produit->descProduit = $request->input('description');
        $produit->stockProduit = $request->input('stock');

        if ($request->input('marque') == "null" || $request->input('marque') == "") {
            $produit->marque  = null;
        } else {
            $produit->marque  = $request->input('marque');
        }

        if ($request->input('theme') == "null" || $request->input('theme') == "") {
            $produit->theme  = null;
        } else {
            $produit->theme  = $request->input('theme');
        }

        if ($request->input('is_indesponsable') == "true") {
            $produit->is_indesponsable = true;
        } else {
            $produit->is_indesponsable = false;
        }

        $produit->prixProduit = $request->input('prix');
        $produit->uniteVendu = 0;

        if ($request->input('promotion_id') == "null" || $request->input('promotion_id') == "") {
            $produit->promotion_id = null;
        } else {
            $produit->promotion_id = $request->input('promotion_id');
        }

        $produit->categorie_id = $request->input('categorie_id');
        $produit->save();
        $paths = array();
        //storing the principal image should be sent as principal_img.
        if ($request->hasFile('principal_img')) {
            $img = $request->file('principal_img');
            $image = new Image();
            $newImageName = time() . '-' . $img->getClientOriginalName();
            $img->move(public_path('images'), $newImageName);
            $image->image_content = "images/" . $newImageName;
            $image->is_principal = true;
            $image->produit_id = $produit->id;
            $paths[0] = $image->image_content;
            $image->save();
        }
        if ($request->hasFile('images')) {
            $i = 1;
            foreach ($request->file("images") as $img) {
                $image = new Image();
                $newImageName = time() . '-' . $img->getClientOriginalName();
                $img->move(public_path('images'), $newImageName);
                $image->image_content = "images/" . $newImageName;
                $image->is_principal = false;
                $image->produit_id = $produit->id;
                $paths[$i] = $image->image_content;
                $image->save();
                $i = $i + 1;
            }
        }

        $response = [
            "paths" => $paths,
            "message" => "stored sucessfully"
        ];
        return response()->json($response, 200);
    }

    public function show($id)
    {
        $produit = Produit::findOrFail($id)
            ->with(['promotion', 'categorie', 'images'])
            ->get();
        return response()->json($produit, 200);
    }

    public function edit($id)
    {
        $product = Produit::with(['promotion', 'categorie', 'images'])
            ->whereId($id)
            ->get();
        return response()->json($product, 200);
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
        // $validated = $request->validate([
        //     'titre' => 'bail|required|min:10',
        //     'description' => 'bail|required|min:10',
        //     'stock' => 'bail|required|numeric|integer',
        //     'marque' => 'bail|required|string',
        //     'prix' => 'bail|required|numeric',
        //     'promotion_id'=>'nullable',
        //     'categorie_id'=>'required',
        //     // 'specification_titre' => 'string|max:25',
        //     // 'specification_description' => 'string|max:50',
        // ]);
        //getting data from the inputs
        $produit = Produit::findOrFail($id);
        $produit->titreProduit = $request->input('titre');
        $produit->descProduit = $request->input('description');
        $produit->stockProduit = $request->input('stock');

        if ($request->input('marque') == "null" || $request->input('marque') == "") {
            $produit->marque  = null;
        } else {
            $produit->marque  = $request->input('marque');
        }

        if ($request->input('theme') == "null" || $request->input('theme') == "") {
            $produit->theme  = null;
        } else {
            $produit->theme  = $request->input('theme');
        }

        if ($request->input('is_indesponsable') == "true") {
            $produit->is_indesponsable = true;
        } else {
            $produit->is_indesponsable = false;
        }

        $produit->prixProduit = $request->input('prix');
        $produit->uniteVendu = 0;
        if ($request->input('promotion_id') == "null" || $request->input('promotion_id') == "") {
            $produit->promotion_id = null;
        } else {
            $produit->promotion_id = $request->input('promotion_id');
        }
        $produit->categorie_id = $request->input('categorie_id');
        $produit->save();
        $paths = array();
        //storing the principal image should be sent as principal_img.
        if ($request->hasFile("principal_img")) {
            $image = new Image();
            $tmp = file_get_contents($request->file('principal_img'));
            $blob = base64_encode($tmp);
            $image->image_content = $blob;
            $paths["img_0"] = $blob;
            $image->is_principal = true;
            $image->produit_id = $produit->id;
            $image->save();
        }

        //storing the secodary images declared as image[]
        if ($request->hasFile("image")) {
            $i = 1;
            foreach ($request->file("image") as $img) {
                $image = new Image();
                $tmp = file_get_contents($img);
                $blob = base64_encode($tmp);
                $paths["img_" . "$i"] = $blob;
                $image->is_principal = false;
                $image->produit_id = $produit->id;
                $image->image_content = $blob;
                $i = $i + 1;
                $image->save();
            }
        }
        $response = [
            "path" => $paths,
            "message" => "Updated Successfully "
        ];
        return response()->json($response, 200);
        // return response()->json($validated);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $product = Produit::findOrFail($id);
        $product->delete();
        $response = [
            "message" => "the product is successfully deleted"
        ];
        return response()->json($response, 200);
    }

    public function indesponsable()
    {
        $produits = Produit::query()->with(['promotion', 'categorie'])
            ->with(array('images' => function ($query) {
                $query->select('produit_id', 'is_principal', 'image_content');
            }))
            ->where('is_indesponsable', true)
            ->get();
        $reponse = [
            "produits" => $produits
        ];
        return response()->json($reponse, $produits ? 202 : 404);
    }
}
