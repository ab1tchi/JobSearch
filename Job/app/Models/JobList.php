<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class JobList extends Model
{
    protected $table = 'job_lists';

    protected $fillable = [
        'title',
        'category',
        'job_type',
        'vacancy',
        'salary',
        'location',
        'date_posted',
        'description',
        'benefits',
        'responsibility',
        'qualifications',
        'experience',
        'keywords',
        'company_name',
        'company_location',
        'company_website',
    ];
}
