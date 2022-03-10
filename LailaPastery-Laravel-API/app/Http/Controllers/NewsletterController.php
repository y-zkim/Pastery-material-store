<?php

namespace App\Http\Controllers;

use App\Models\Newsletter;
use Illuminate\Http\Request;

class NewsletterController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $newsletters = Newsletter::all()->toArray();
        return response()->json(["newsletters" => $newsletters], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $req)
    {
        $validated = $req->validate([
            'email' => 'required|string|email|unique:users,email',
        ]);

        $email = $req->input('email');

        $check = Newsletter::where('email', $email)->first();

        if ($check) {
            return response()->json(['message' => 'Cette email existe deja'], 409);
        }

        $newsletter = new Newsletter();
        $newsletter->email = $req->input('email');
        $newsletter->save();
        return response()->json(["message" => "la newsletter est ajoutée avec succès"], 200);
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
        $newsletter = Newsletter::findOrFail($id);
        $newsletter->email = $request->input('email');
        $newsletter->save();
        return response()->json(["message" => "la newsletter est mis à jour avec succès"], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $newsletter =  Newsletter::find($id);
        $newsletter->delete();
        return response()->json(["message" => "la banniére est supprimée avec succès"], 200);
    }
}
