<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Produit extends Model
{

    use HasFactory;
    protected $fillable = [
        'titreProduit', 'descProduit', 'stockProduit',
        'marque', 'prixProduit', 'promotion_id', 'categorie_id'
    ];

    protected $hidden = ['created_at', 'updated_at', 'promotion_id', 'categorie_id'];

    public function specification()
    {
        return $this->hasMany('App\Models\Specification');
    }
    public function avis()
    {
        return $this->hasMany('App\Models\Avis');
    }
    public function images()
    {
        return $this->hasMany('App\Models\Image');
    }
    public function favourite()
    {
        return $this->belongsTo('App\Models\Favourite');
    }
    public function categorie()
    {
        return $this->belongsTo('App\Models\Categorie');
    }
    public function promotion()
    {
        return $this->belongsTo('App\Models\Promotion');
    }
    public function commandes()
    {
        return $this->belongsToMany(Commande::class, 'commande_produit', 'produit_id', 'commande_id')->withPivot(['quantite', 'prixElement']);
    }
}
