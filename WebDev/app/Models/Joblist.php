<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobList extends Model
{
    protected $table = 'job_lists';

    protected $fillable = [
        'title',
        'company',
        'description',
        'location',
        'job_type',
        'date_posted',
        'salary_min',
        'salary_max',
    ];
}
