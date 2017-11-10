<?php

namespace App\Http\Controllers;

use App\Transaction;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    public function index()
    {
        return Transaction::all();
    }

    public function getTransactionsByType($id)
    {
        return Transaction::where('type_id', $id)->get();
    }

    public function createTransaction(Request $request)
    {
        $user = User::findOrFail($request->user_id);
        $points = 0;

        // Transaction type == ride
        if ($request->type_id == 1) {
            $points = 100;
        }

        $user->current_points += $points;
        $user->save();

        $dt = Carbon::createFromTimestampUTC($request->transaction_date);
        $dt->timezone = 'America/Edmonton';

        $transaction = new Transaction;
        $transaction->user_id = $request->user_id;
        $transaction->type_id = $request->type_id;
        $transaction->transaction_date = $dt->toDateTimeString();
        $transaction->points = $points;
        $transaction->save();
        return $transaction;
    }
}
