<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCommandesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('commandes', function (Blueprint $table) {
            $table->bigIncrements('id')->unsigned();
            $table-> integer('nbrArticle')->unsigned()->default(0);
            $table->string('etat', 100)->default('in_basket');
            $table -> unsignedBigInteger('user_id')->nullable();
            $table -> unsignedBigInteger('coupon_id')->unique()->nullable();
            
            $table -> timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('commandes');
    }
}
