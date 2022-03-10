<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Produit;
use App\Models\Categorie;

class SearchController extends Controller
{
    // Search Products
    public function search(Request $req)
    {
        $query = $req->get('query');
        $products['produits'] = Produit::where('titreProduit', 'LIKE', '%' . $query . '%')
            ->with(['avis', 'promotion', 'images', 'categorie'])
            ->get();

        $products['query'] = $query;
        $products['resultscount'] = count($products) - 1;
        return $products;
    }
    //Acces to Categries products
    public function category($category = null)
    {
        if (!$category) {
            $categories = Categorie::all();
            return response()->json($categories, 200);
        } else {
            $produits['produits'] = Produit::where('categorie_id', $category)->with(['promotion', 'categorie', 'images'])->get();
            return response()->json($produits, 200);
        }
    }
}
