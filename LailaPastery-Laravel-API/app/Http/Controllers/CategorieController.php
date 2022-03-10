<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Categorie;
use App\Models\Image;

class CategorieController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $category = Categorie::all();
        return response()->json(["categories" => $category], 200);
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
        $validated = $request->validate(
            [
                "libelle" => "required | string | max:200",
                "image" => "required | mimes:jpg,png,jpeg"
            ]
        );
        $category = new Categorie();
        $category->libelleCategorie = $request->input('libelle');
        $img = $request->file('image');
        $newImageName = time() . '-' . $img->getClientOriginalName();
        $img->move(public_path('images/Categories'), $newImageName);
        $category->image_content = "images/Categories/" . $newImageName;
        $category->save();
        return response()->json(["message" => "la Catégorie est ajoutée avec succès"], 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $category = Categorie::find($id);
        return response()->json(["category" => $category], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $category = Categorie::find($id);
        return response()->json(["category" => $category], 200);
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
        $category = Categorie::find($id);
        $category->libelleCategorie = $request->input('libelle');
        $img = $request->file('image');
        $newImageName = time() . '-' . $img->getClientOriginalName();
        $img->move(public_path('images/Categories'), $newImageName);
        $category->image_content = "images/Categories/" . $newImageName;
        $category->save();
        return response()->json(["message" => "la Catégorie est mis à jour avec succès"], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $category =  Categorie::find($id);
        $category->delete();
        return response()->json(["message" => "la Catégorie est supprimée avec succès"], 200);
    }
}
