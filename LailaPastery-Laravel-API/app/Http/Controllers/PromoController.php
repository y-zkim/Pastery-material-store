<?php

namespace App\Http\Controllers;

use App\Http\Resources\promotion as ResourcesPromotion;
use App\Models\Promotion;
use Illuminate\Http\Request;

class PromoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $promotion = Promotion::all();
        return response()->json($promotion,200);
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
    public function store(Request $req)
    {
        $validation = $req->validate([
                "descPromo" => "bail|string",
                "valeurPromo" => "bail|required|numeric",
                "dateFinPromo" => "bail|date"
            ]);
        $promotion = new Promotion();
        $promotion->descPromo = $req->input('descPromo');
        $promotion->valeurPromo = $req->input('valeurPromo');
        $promotion->dateFinPromo = $req->input('dateFinPromo');
        $promotion->save();
        return response()->json([
            "message" => "la promotion enregistre avec succes"
        ],200);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $promotion = Promotion::find($id);
        return response()->json($promotion,200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $promotion = Promotion::find($id);
        return response()->json($promotion,200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $req, $id)
    {
        $validation = $req->validate([
            "descPromo" => "bail|string",
            "valeurPromo" => "bail|required|numeric",
            "dateFinPromo" => "bail|date"
        ]);
    $promotion =Promotion::find($id);
    $promotion->descPromo = $req->input('descPromo');
    $promotion->valeurPromo = $req->input('valeurPromo');
    $promotion->dateFinPromo = $req->input('dateFinPromo');
    $promotion->save();
    return response()->json([
        "message" => "la promotion mis a jour avec succes"
    ],200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $promotion = Promotion::find($id);
        $promotion->delete();
        return response()->json([
            "message" => "promotion deleted successfully"
        ]);
    }
}
