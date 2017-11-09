<?php

namespace App\Http\Controllers;

use App\Crypto;
use Carbon\Carbon;
use Endroid\QrCode\ErrorCorrectionLevel;
use Endroid\QrCode\QrCode;

class QRController extends Controller
{
    public function index()
    {
        $sunday = Carbon::today()->startOfWeek()->addDays(6);
        $encrypted = Crypto::cryptoJsAesEncrypt(env("APP_KEY"), $sunday->toDateString());
        $qrCode = new QrCode($encrypted);
        $qrCode->setErrorCorrectionLevel(ErrorCorrectionLevel::MEDIUM);
        $qrCode->setLabel('QR Code for ' . $sunday->toFormattedDateString());
        $qrCode->setLogoPath(app()->basePath('public/images/captain-shuttle-logo.png'));
        $qrCode->setLogoWidth(110);

        header('Content-Type: '.$qrCode->getContentType());
        echo $qrCode->writeString();
    }
    
    public function test()
    {
        /*
        $dt = Carbon::createFromTimestampUTC(1509940780);
        $dt->timezone = 'America/Edmonton';
        echo $dt;
        */

        $sunday = Carbon::today()->toDateString();
        $encrypted = Crypto::cryptoJsAesEncrypt(env("APP_KEY"), $sunday);
        $qrCode = new QrCode($encrypted);
        
        header('Content-Type: '.$qrCode->getContentType());
        echo $qrCode->writeString();
    }
}
