<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLivraisonsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('livraisons', function (Blueprint $table) {
            $table->id()->unsigned();
            $table -> string ('adresseLivraison');
            $table -> string ('prenomLivraison');
            $table -> string ('nomLivraison');
            $table -> string ('emailLivraison');
            $table -> string ('teleLivraison');
            $table -> date('dateEstimeLivraison')->nullable();
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
        Schema::dropIfExists('livraisons');
    }
}
