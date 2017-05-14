<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        return User::all();
    }

    public function getUser($id)
    {
        return User::findOrFail($id);
    }

    public function getUserTransactions($id)
    {
        return User::findOrFail($id)->transactions;
    }

    public function createUser(Request $request)
    {
        return User::create($request->all());
    }
}
