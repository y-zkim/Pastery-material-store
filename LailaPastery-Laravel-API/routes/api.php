<?php

use App\Mail\WelcomMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
//Public Routes 


// Route::group(['middleware' => ['web']], function () {});
// Search for categories and products
Route::get('/categories/{category?}', "SearchController@category")->name('products.categorie');  //done
Route::get('/search', "SearchController@search")->name('products.search');  //done
Route::resource('/products', "ProductsController");  // almost done
Route::resource('/promotion', "PromoController"); // done
Route::resource('/banner', "BannerController"); // done
Route::resource('/newsletter', "NewsletterController"); // done
Route::resource('/categorie', "CategorieController")->except('create'); // done
Route::get('/basket', "commandeController@index");
Route::get('/indesponsable', "ProductsController@indesponsable")->name('indesponsable');
Route::get('/TreatedCommandes', "commandeController@TreatedCommandes")->name('TreatedCommandes');
//auth routes
Route::post('/register', "RegisterController@register")->name('register');
Route::post('/login', "LoginController@login")->name('login');
Route::get('/welcomeEmail', function () {
    return new WelcomMail();
})->name('welcomeEmail');

Route::post('/password/email', 'ForgotPasswordController@forgot');
Route::post('/password/reset', 'ForgotPasswordController@reset');
//Private AcControlleess Routes
Route::group(['middleware' => ['auth:sanctum']], function () {
    // Route::resource('/products', 'ProductsController')->except('index','show');
    Route::post('/logout', "LogoutController@logout")->name('logout');
    Route::post('/pay', "CommandeController@pay")->name('pay');
    Route::get('/facture/{id}', "CommandeController@getFacture")->name('getFacture');

    Route::resource('/basket', "commandeController")->except('index');
    Route::resource('/facture', "FactureController");
    Route::resource('/user', "UserController");
    Route::get('/admins', "UserController@admins")->name('admins');
    Route::get('/payedFactures', "FactureController@payedFactures")->name('payedFactures');
    Route::get('/treatedFactures', "FactureController@treatedFactures")->name('treatedFactures');
    Route::get('/historyFactures', "FactureController@historyFactures")->name('historyFactures');
    Route::get('/userFactures', "FactureController@userFactures")->name('userFactures');
    Route::resource('/favourite', "FavouriteController")->except(['update', 'edit', 'create']);
    Route::get('/cart', "commandeController@Cart")->name('cart');
    
});
Route::middleware(['cors'])->group(function () {
});
