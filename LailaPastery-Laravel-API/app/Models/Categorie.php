<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Categorie extends Model
{
    use HasFactory;
    protected $hidden = ['created_at', 'updated_at'];
    public function produits()
    {
        return $this->hasMany('App\Models\Produit');
    }
}
