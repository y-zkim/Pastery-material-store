<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Facture extends Model
{
    use HasFactory;
    public function commande(){
        return $this -> belongsTo("App\Models\Commande");
    }
    public function payement(){
        return $this -> belongsTo("App\Models\Payement");
    }
    public function livraison(){
        return $this -> belongsTo("App\Models\Livraison");
    }
}
