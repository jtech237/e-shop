import { Skeleton } from "@nextui-org/skeleton";

export const CategoryRowSkeleton = () => (
  <>
    <div className="grid grid-cols-4 border-t border-stroke px-4 py-4.5 dark:border-strokedark sm:grid-cols-7 md:px-6 2xl:px-7.5">
      <div className="col-span-2 sm:col-span-3 flex items-center">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <Skeleton className="rounded-md">
            <div className="h-12.5 w-15"></div>
          </Skeleton>
          <Skeleton>
            <div className="h-4 w-40"></div>
          </Skeleton>
        </div>
      </div>
      <div className="col-start-3 sm:col-start-4 flex items-center">
        <Skeleton>
          <div className="h-4 w-40"></div>
        </Skeleton>
      </div>
      <div className="col-span-2 col-start-5 flex items-center flex-col gap-2">
        <Skeleton>
          <div className="h-4 w-40 rounded-md"></div>
        </Skeleton>
        <Skeleton>
          <div className="h-4 w-10 rounded-md"></div>
        </Skeleton>
        <Skeleton>
          <div className="h-4 w-25 rounded-md"></div>
        </Skeleton>
      </div>
      <div className="col-start-4 sm:col-start-7 gap-2 flex items-center">
        <Skeleton>
          <div className="h-4 w-8"></div>
        </Skeleton>
        <Skeleton>
          <div className="h-4 w-8"></div>
        </Skeleton>
        <Skeleton>
          <div className="h-4 w-8"></div>
        </Skeleton>
      </div>
      <span className="sr-only">Data loading</span>
    </div>
  </>
);
