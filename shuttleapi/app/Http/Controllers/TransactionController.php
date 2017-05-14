<?php

namespace App\Http\Controllers;

use App\Transaction;
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
        $transaction = new Transaction;
        $transaction->user_id = $request->user_id;
        $transaction->type_id = $request->type_id;
        $transaction->transaction_date = $request->transaction_date;
        $transaction->points = $request->points;
        $transaction->save();
        return $transaction;
    }
}
