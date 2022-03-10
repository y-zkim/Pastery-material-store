<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LogoutController extends Controller
{
    public function logout(Request $req){
        auth()->user()->tokens()->delete();
        $response = [
            "message" => "logged out Successfully"
        ];
        return response()->json($response,200);
    }
}
