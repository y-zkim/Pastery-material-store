<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Favourite;

class FavouriteController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $favourite = Favourite::where('user_id', '=', Auth()->user()->id)
        ->with('produits')
        ->get();
        return response()->json([
            'message'=>'la liste des produits favouris',
            'favourite'=> $favourite
        ],200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $produit = $request->input('produit');
        $fav = new Favourite();
        $fav->user_id = Auth()->user()->id;
        $fav -> produit_id = $produit;
        $fav -> save();
        return response()->json([
            'message' => 'le produit est ajouté au favoris'
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $fav = Favourite::where('user_id',Auth()->user()->id)
        ->where('produit_id',$id)
        ->first();
      
        if($fav == null){
            $response = false;
            return response()->json(
                [
                    'response' => $response,
                    'message' => 'ce produit n\'existe pas'
                ],200);
        }else {
            $response = true;
            return response()->json(
                [
                    'response' => $response,
                    'message'=>'ce produit exsite'
                ],200
            );
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        
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
        $fav = Favourite::where('user_id',Auth()->user()->id)
        ->where('produit_id',$id)
        ->first();
        $fav->delete();
        return response()->json(
            [
                'message'=>'ce produit est supprimé de la liste'
            ],200
        );
    }
}
