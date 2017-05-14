<?php

use Illuminate\Database\Seeder;
use Carbon\Carbon;

class TransactionTypesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('transaction_types')->insert([
            'type' => 'ride',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        DB::table('transaction_types')->insert([
            'type' => 'redeem',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);
    }
}
