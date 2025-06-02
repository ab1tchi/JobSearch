<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('job_lists', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('category')->nullable();
            $table->string('job_type')->nullable(); // e.g., full-time, freelance
            $table->integer('vacancy')->nullable();
            $table->integer('salary')->nullable();
            $table->string('location')->nullable();
            $table->date('date_posted')->nullable();

            $table->text('description')->nullable();
            $table->text('benefits')->nullable();
            $table->text('responsibility')->nullable();
            $table->text('qualifications')->nullable();
            $table->string('experience')->nullable(); // e.g., 0-1 years
            $table->text('keywords')->nullable(); // comma-separated or JSON

            $table->string('company_name'); // Company name
            $table->string('company_location')->nullable();
            $table->string('company_website')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_lists');
    }
};
