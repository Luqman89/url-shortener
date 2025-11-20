<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Link extends Model
{
    protected $fillable = ['original_url', 'short_code'];

    public static function boot()
    {
        parent::boot();

        static::creating(function ($link) {
            $link->short_code = Str::random(8);
        });
    }
}
