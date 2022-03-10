<?php

namespace App\Http\Controllers;

use App\Mail\WelcomMail;
use App\Models\User;
use App\Models\Produit;
use App\Models\Commande;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Mail;

class RegisterController extends Controller
{

    public function register(Request $req)
    {
        $validated = $req->validate([
            'nom' => 'required|string|min:3|max:255',
            'prenom' => 'required|string|min:3|max:255',
            'email' => 'required|string|email|unique:users,email',
            'sexe' => 'required|string',
            // 'telephone' => 'nulablle|string|min:10|max:10',
            'password' => 'required|string|min:8|confirmed',
            // 'adresse' => 'nullable|string',
            // 'codePostale' => 'nullable|string'
        ]);

        $email = $req->input('email');

        $check = User::where('email', $email)->first();

        if ($check) {
            return response()->json(['message' => ' cette utilisateur existe deja'], 409);
        }

        $user = new User();

        $date = Carbon::now();
        $user->email = $req->input('email');
        $user->password = Hash::make($req->input('password'));
        $user->nom = $req->input('nom');
        $user->prenom = $req->input('prenom');
        $user->adresse = $req->input('adresse');
        $user->telephone = $req->input('telephone');
        $user->sexe = $req->input('sexe');
        $user->codePostale = $req->input('codePostale');
        $user->is_admin = $req->input('is_admin');
        $user->email_verified_at = $date->toDateTimeString();
        $user->save();

        $token = $user->createToken('API Token')->plainTextToken;
        $req->session()->flash('message', 'inscrit avec succés !');

        if($user->is_admin) {
            $response = [
                "token" => $token,
                "user" => $user,
                "commande" => null
            ];
            return response()->json($response, 200);
        }
        
        $commande = new Commande();

        $commande->user_id = $user->id;

        $commande->save();

        $commande1 = Commande::whereId($commande->id)->with('produits')->get();

        Mail::to($user->email)->send(new WelcomMail());
        
        $response = [
            "token" => $token,
            "user" => $user,
            "commande" => $commande1
        ];
        return response()->json($response, 200);
    }
}
