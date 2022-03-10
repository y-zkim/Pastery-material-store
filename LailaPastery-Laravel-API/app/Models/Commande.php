<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Commande extends Model
{
    use HasFactory;

    public function facture()
    {
        return $this->hasOne("App\Models\Facture");
    }
    public function user()
    {
        return $this->belongsTo("App\Models\User");
    }
    public function coupon()
    {
        return $this->belongsTo("App\Models\Coupon");
    }

    public function etat()
    {
        return $this->belongsTo("App\Models\Etat");
    }
    public function produits()
    {
        return $this
            ->belongsToMany(Produit::class)
            ->withPivot(['quantite', 'prixElement']);
    }
}
