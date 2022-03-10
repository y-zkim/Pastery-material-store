<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Commande;
use App\Models\Produit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    public function login(Request $req)
    {
        $email = $req->input('email');
        $password = $req->input('password');
        $user = User::where('email', $email)->first();
        $password_hashed = Hash::check($password, $user->password);

        if (!$user || !$password_hashed) {
            return response()->json(
                ['message' => 'Ces Coordonnées ne correspond à aucun Compte'],
                404
            );
        }

        $token = $user->createToken('my-app-token')->plainTextToken;
        $products = array();

        $commande = Commande::where('user_id', $user->id)->where('etat', 'in_basket')->with('produits')->get();
        // $quantity = array();
        // $i = 0;
        // dd($commande->produits);
        // foreach ($commande as $cmd) {
        //     // $products[$i] =;
        //     dd($cmd->pivot);
        //     $i = $i + 1;
        // }
        $response = [
            'token' => $token,
            'user' => $user,
            // 'produits' => $products,
            'commande' => $commande
        ];
        return response()->json($response, 200);
    }
}
