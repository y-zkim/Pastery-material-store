<?php

namespace App\Http\Controllers;

use App\Models\Banner;
use Illuminate\Http\Request;

class BannerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $banners = Banner::all();
        return response()->json(["banners" => $banners], 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $banner = new Banner();
        $banner->description = $request->input('description');
        $img = $request->file('image');
        $newImageName = time() . '-' . $img->getClientOriginalName();
        $img->move(public_path('images/Banner'), $newImageName);
        $banner->image = "images/Banner/" . $newImageName;
        $banner->save();
        return response()->json(["message" => "la banniére est ajoutée avec succès"], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $banner = Banner::findOrFail($id);
        $banner->description = $request->input('description');
        $img = $request->file('image');
        $newImageName = time() . '-' . $img->getClientOriginalName();
        $img->move(public_path('images/Banner'), $newImageName);
        $banner->image = "images/Banner/" . $newImageName;
        $banner->save();
        return response()->json(["message" => "la banniére est mis à jour avec succès"], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $banner =  Banner::find($id);
        $banner->delete();
        return response()->json(["message" => "la banniére est supprimée avec succès"], 200);
    }
}
