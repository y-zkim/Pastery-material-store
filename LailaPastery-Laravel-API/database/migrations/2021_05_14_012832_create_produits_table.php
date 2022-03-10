<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProduitsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('produits', function (Blueprint $table) {
            $table->id()->unsigned();
            $table->string('reference')->unique();
            $table->string('titreProduit');
            $table->text('descProduit');
            $table->integer('stockProduit');
            $table->integer('uniteVendu');
            $table->string('marque')->nullable();
            $table->string('theme')->nullable();
            $table->boolean('is_indesponsable')->default(false);
            // $table -> images('titreProduit');
            $table->float('prixProduit');
            $table->unsignedBigInteger('promotion_id')->nullable();
            $table->unsignedBigInteger('categorie_id')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('produits');
    }
}
