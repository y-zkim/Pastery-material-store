<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Promotion extends Model
{
    use HasFactory;

    protected $fillable = ['descPromo','valeurPromo','dateFinPromo'];
    protected $hidden = ['created_at','updated_at'];

    public function produit(){
        return $this->hasMany('App\Models\Produit');
    }
}
