<?php

namespace App\Http\Controllers;

use App\Models\Joblist;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        $categoryCounts = DB::table('job_lists')
            ->select('category', DB::raw('count(*) as count'))
            ->groupBy('category')
            ->pluck('count', 'category')
            ->toArray();

        return Inertia::render('dashboard', [
            'categories' => $categoryCounts,
        ]);
    }
}
