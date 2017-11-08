<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Transaction extends Model
{
    use SoftDeletes;

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = [
        'transaction_date',
        'deleted_at'
    ];

    /**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'transaction_date',
        'points'
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
        'user'
    ];


    /**
     * All of the relationships to be touched.
     *
     * @var array
     */
    protected $touches = ['user'];

    /**
     * Get the user that owns the transaction.
     */
    public function user()
    {
        return $this->belongsTo('App\User');
    }

    /**
     * Get the transaction type that owns the transaction.
     */
    public function transactionType()
    {
        return $this->belongsTo('App\TransactionType', 'type_id');
    }
}
