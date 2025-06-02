import { Head, Link, usePage, router } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { ChevronLeft, Trash2, Edit } from 'lucide-react';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

type Job = {
  id: number;
  title: string;
  category: string;
  job_type: string;
  vacancy: number;
  salary: number;
  location: string;
  description: string;
  benefits?: string;
  responsibility?: string;
  qualifications?: string;
  experience: string;
  keywords: string;
  company_name: string;
  company_location: string;
  company_website?: string;
  date_posted: string;
};

export default function JobDetails() {
  const { job } = usePage().props as { job?: Job };
  const [openDialog, setOpenDialog] = useState(false);

  if (!job) return <div>Job not found.</div>;

  // Delete handler
  const handleDelete = () => {
    router.delete(route('joblist.destroy', job.id), {
      onSuccess: () => {
        setOpenDialog(false);
        router.visit(route('joblist.index'));
      },
    });
  };

  // Update handler (redirects to edit page)
  const handleUpdate = () => {
    router.visit(route('joblist.edit', job.id));
  };

  return (
    <AppLayout>
      <div className="min-h-screen w-full max-w-7xl mx-auto px-4 py-6 flex flex-col">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
          <div>
            <Head title={`${job.title} - Job Details`} />
            <h1 className="text-3xl font-bold">{job.title}</h1>
            <p className="text-lg text-gray-600">Job ID: {job.id}</p>
          </div>
          <div className="flex items-center gap-4">
            {/* Back button */}
            <Button
              variant="outline"
              onClick={() => router.visit(route('joblist.index'))}
              className="inline-flex text-lg border border-black bg-[#04045E] px-3 py-2 rounded-lg text-white cursor-pointer hover:bg-[#FE9E01]"
              aria-label="Back to Job Post"
            >
              <ChevronLeft className="h-5 w-5" />
              <span>Back to Job Post</span>
            </Button>

            {/* Update button */}
            <Button
              variant="outline"
              onClick={handleUpdate}
              className="inline-flex text-lg border border-black bg-[#04045E] px-3 py-2 rounded-lg text-white cursor-pointer hover:bg-[#FE9E01]"
              aria-label="Update Job"
            >
              <Edit className="h-5 w-5" />
              <span>Update</span>
            </Button>

            {/* Delete dialog */}
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="inline-flex text-lg border border-black bg-[#04045E] px-3 py-2 rounded-lg text-white cursor-pointer hover:bg-[#FE9E01]"
                  aria-label="Delete Job"
                >
                  <Trash2 className="h-5 w-5" />
                  <span>Delete</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Confirm Deletion</DialogTitle>
                </DialogHeader>
                <p>Are you sure you want to delete this job?</p>
                <DialogFooter className="gap-2 pt-4">
                  <Button variant="outline" onClick={() => setOpenDialog(false)}>
                    Cancel
                  </Button>
                  <Button variant="destructive" onClick={handleDelete}>
                    Confirm Delete
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Main content */}
        <div className="flex flex-1 gap-6">
          {/* Left column */}
          <div className="flex flex-col w-1/2 gap-6 h-full">
            <Card className="h-1/2 overflow-auto p-6">
              <CardHeader>
                <CardTitle className="text-xl uppercase font-semibold text-gray-800 shadow-md inline-flex items-center gap-2">
                  📝 Job Overview
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-base">
                <p>
                  <strong>Category:</strong> {job.category}
                </p>
                <p>
                  <strong>Job Type:</strong> {job.job_type}
                </p>
                <p>
                  <strong>Vacancies:</strong> {job.vacancy}
                </p>
                <p>
                  <strong>Salary:</strong> ₱{job.salary.toLocaleString()}
                </p>
                <p>
                  <strong>Location:</strong> {job.location}
                </p>
                <p>
                  <strong>Date Posted:</strong>{' '}
                  {new Date(job.date_posted).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
            <Card className="h-1/2 overflow-auto p-6">
              <CardHeader>
                <CardTitle className="text-xl uppercase font-semibold text-gray-800 shadow-md inline-flex items-center gap-2">
                  🧾 Company Info
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-base">
                <p>
                  <strong>Company Name:</strong> {job.company_name}
                </p>
                <p>
                  <strong>Company Location:</strong> {job.company_location}
                </p>
                {job.company_website && (
                  <p>
                    <strong>Website:</strong>{' '}
                    <a
                      href={`https://${job.company_website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-700 underline"
                    >
                      {job.company_website}
                    </a>
                  </p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right column */}
          <div className="w-1/2 h-full">
            <Card className="h-full overflow-auto p-6">
              <CardHeader>
                <CardTitle className="text-xl uppercase font-semibold text-gray-800 shadow-md inline-flex items-center gap-2">
                  🛠️ Job Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-base">
                <p>
                  <strong>Description:</strong> {job.description}
                </p>
                {job.responsibility && (
                  <p>
                    <strong>Responsibilities:</strong> {job.responsibility}
                  </p>
                )}
                {job.qualifications && (
                  <p>
                    <strong>Qualifications:</strong> {job.qualifications}
                  </p>
                )}
                <p>
                  <strong>Experience:</strong> {job.experience}
                </p>
                {job.benefits && (
                  <p>
                    <strong>Benefits:</strong> {job.benefits}
                  </p>
                )}
                <p>
                  <strong>Keywords:</strong> {job.keywords}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
