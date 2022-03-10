<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }
    
    public function admins()
    {
        if(Auth::user()->is_admin == 1){
            $admins = User::where('is_admin', '=', 1)->get();
            $response = [
                "admins" => $admins
            ];
            return response()->json($response, 200);
        } else {
            return response()->json("Vous n'êtes pas un admin", 409);
        }
        
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
    public function update(Request $req, $id)
    {
        $user = User::findOrFail($id);
        if($user->id == Auth()->user()->id) {
            $user->nom = $req->input('nom');
            $user->prenom = $req->input('prenom');
            $user->adresse = $req->input('adresse');
            $user->ville = $req->input('ville');
            $user->telephone = $req->input('telephone');
            $user->codePostale = $req->input('codePostale');
            $user->save();
        }
        $response = [
            "user" => $user
        ];
        return response()->json($response, 200);
        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        User::findOrFail($id)->delete();
        return response()->json(["message" => "L'admin est supprimee"], 200);
    }
}
