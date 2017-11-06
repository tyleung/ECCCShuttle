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
        $user->current_points += $request->points;
        $user->save();

        $dt = Carbon::createFromTimestampUTC($request->transaction_date);
        $dt->timezone = 'America/Edmonton';

        $transaction = new Transaction;
        $transaction->user_id = $request->user_id;
        $transaction->type_id = $request->type_id;
        $transaction->transaction_date = $dt->toDateTimeString();
        $transaction->points = $request->points;
        $transaction->save();
        return $transaction;
    }
}
