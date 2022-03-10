<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Avis extends Model
{
    use HasFactory;
    public function produit(){
        return $this->belongsTo('App\Models\Produit');
    }
    public function user(){
        return $this->belongsTo('App\Models\User');
    }
}
