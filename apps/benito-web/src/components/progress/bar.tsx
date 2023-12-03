import React from "react";

type ProgressBarProps = {
    value: number;
    rightComponent?: React.ReactElement;
};

export const ProgressBar = ({value, rightComponent}: ProgressBarProps) => {
    const progress = Math.ceil(value * 100);

  return (
      <div>
          <div className={"w-full h-6 items-center justify-center"}>
              <div className={"bg-blue-300 w-full rounded-2xl"}>
                  <div style={{width: `${progress}%`}} className={`h-6 rounded-2xl bg-blue-500 flex text-white font-bold`}>
                      <p className={"absolute text-inherit pl-[37%]"}>
                          {progress}%
                      </p>

                      {rightComponent && <div className={"absolute right-1 mr-6"}>
                          {rightComponent}
                      </div>}
                  </div>
              </div>
          </div>
      </div>


  )
}
