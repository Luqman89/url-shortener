<?php

namespace App\Http\Controllers;

use App\Models\Link;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LinkController extends Controller
{
   public function store(Request $request)
    {
        $request->validate([
            'original_url' => 'required|url|active_url',
        ], [
            'original_url.required'     => 'URL wajib diisi',
            'original_url.url'          => 'Format URL tidak valid',
            'original_url.active_url'   => 'URL tidak dapat diakses, pastikan URL aktif',
        ]);

        $link = Link::create([
            'original_url' => $request->original_url,
        ]);

        return response()->json([
            'status'        => 200,
            'short_url'     => url($link->short_code),
            'original_url'  => $link->original_url
        ]);
    }
}
