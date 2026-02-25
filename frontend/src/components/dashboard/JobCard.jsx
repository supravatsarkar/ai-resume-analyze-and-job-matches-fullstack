import { motion } from "motion/react";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
const JobCard = ({ job }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.25 }}
  >
    <Card className="rounded-2xl hover:shadow-lg transition-all border">
      <CardContent className="p-5">
        <div className="flex gap-4">
          <img
            src={job.companyLogo}
            alt={job.company}
            className="w-12 h-12 rounded-xl object-contain border"
          />

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold text-lg leading-tight">
                  {job.position}
                </h3>
                <p className="text-sm text-gray-500">{job.company}</p>
              </div>

              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-lg whitespace-nowrap">
                {job.salary || "Not specified"}
              </span>
            </div>

            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-sm text-gray-500">
              <span>📍 {job.location}</span>
              {job.agoTime && <span>⏱ {job.agoTime}</span>}
              {job.date && <span>🗓 {job.date}</span>}
            </div>

            <div className="flex items-center justify-between mt-4">
              <a href={job.jobUrl} target="_blank" rel="noreferrer">
                <Button size="sm">Apply Now</Button>
              </a>

              <span className="text-xs text-gray-400">AI matched</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

export default JobCard;
