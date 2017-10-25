<?php

namespace App\Http\Controllers;

use App\Crypto;
use Carbon\Carbon;
use Endroid\QrCode\QrCode;

class QRController extends Controller
{
    public function index()
    {
        $sunday = Carbon::today()->startOfWeek()->addDays(6)->toDateString();
        $encrypted = Crypto::cryptoJsAesEncrypt(env("APP_KEY"), $sunday);
        $qrCode = new QrCode($encrypted);
        
        header('Content-Type: '.$qrCode->getContentType());
        echo $qrCode->writeString();
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
