import React from "react";
import PropTypes from 'prop-types';
import { TailSpin } from "react-loader-spinner";

function Case({
  fetchedData,
  query,
  handleClick,
  loading,
}) {
  return (
    <div className={`flex flex-col pt-5 pb-4 ${fetchedData ? 'col-span-1 border-r border-gray-200 ' : 'col-span-2 '}`} style={{ height: 'calc(100vh - 121px)' }}>
      <div className="px-8 border-b border-gray-200 pb-2 mb-4 flex flex-row justify-between">
        <div className="font-semibold">Transcript</div>
      </div>
      <div className="px-8 h-full">
        <textarea
          className="border border-1 border-gray-400 rounded w-full focus:outline-0 p-2 text-xs h-[90%]"
          value={query}
          disabled={true}
        />
      </div>
      {!fetchedData && (
        <div className="flex justify-center">
          <button
            className="bg-accent px-2 py-1 text-white rounded text-xs w-[120px] flex justify-center items-center"
            disabled={loading}
            onClick={handleClick}
          >
            {loading ? (
              <TailSpin
                visible={true}
                height="20"
                width="20"
                color="#fff"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
              />
            ) : (
            'Run Analysis'
            )}
          </button>
        </div>
      )}
    </div>
  )
}

export default Case;

Case.propTypes = {
    fetchedData: PropTypes.bool.isRequired,
    query: PropTypes.string.isRequired,
    handleClick: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
  };