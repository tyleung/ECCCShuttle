<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class TestController extends Controller
{
    public function index() {
        $users = DB::select('SELECT * FROM test');
        return $users;
    }
}
