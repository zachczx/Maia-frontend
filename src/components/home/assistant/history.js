function History ({
    callHistory,
    selectedCall,
    setSelectedCall,
}) {

  const convertTimestamp = (timestamp) => {
    const [date, time] = timestamp.split("T");
    const shortenedTime = time.slice(0,5);
    return date + " " + shortenedTime
  }
  return (
    <div className="flex flex-col border-r border-gray-200 text-sm">
      {callHistory.map((call, index) => (
        <div className={`py-4 px-8 ${selectedCall.id === call.id ? 'bg-blue-50 border-l-2 border-accent' : 'border-b'}`} key={index} onClick={() => setSelectedCall(call)}>
        <p>{call.caller_info.name}</p>
        <p className="text-gray-700 text-xs italic pt-1">{convertTimestamp(call.conversation.timestamp)}</p>
      </div>
    ))}
    </div>
  )
}

export default History;