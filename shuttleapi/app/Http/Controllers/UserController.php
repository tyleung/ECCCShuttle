<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use App\Crypto;

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

    public function updateUser(Request $request, $id)
    {
        try {
            $user = User::find($id);
            $user->first_name = $request->first_name;
            $user->last_name = $request->last_name;
            $user->password = $request->password;
            $user->license_plate = $request->license_plate;
            $user->save();
        } finally {
            return response()->json($user);
        }
    }

    public function test()
    {
        $test = Crypto::cryptoJsAesEncrypt(env("APP_KEY"), "hello");
        echo "encrypted<br>";
        echo $test . "<br>";
        $decrypted = Crypto::cryptoJsAesDecrypt(env("APP_KEY"), $test);
        echo "decrypted<br>";
        echo $decrypted . "<br>";
    }
}
