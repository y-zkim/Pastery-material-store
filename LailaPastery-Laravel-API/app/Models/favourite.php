<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Favourite extends Model
{
    use HasFactory;
    public function produits(){
        return $this->hasMany('App\Models\Produit');
    }
    public function user(){
        return $this->belongsTo('App\Models\User');
    }
}
