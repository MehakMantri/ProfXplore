const BotResponse = ({ response }) => {
    const professors = response.match(/\d\.\s\*\*Dr\.\s[\w\s]+\*\*/g) || [];
    const actionMatch = response.match(/ACTION:(UPDATE_RATING|ADD_REVIEW)/);
    const action = actionMatch ? actionMatch[1] : null;
  
    return (
      <div className="bg-gray-700 p-4 rounded-md">
        {professors.length > 0 && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-white mb-2">Suggested Professors:</h3>
            <ul className="list-disc pl-5">
              {professors.map((prof, index) => (
                <li key={index} className="text-gray-300">{prof.replace(/\*/g, '')}</li>
              ))}
            </ul>
          </div>
        )}
        <p className="text-gray-300 mb-4">{response.split("Please note")[0].trim()}</p>
        {action && (
          <div className="bg-blue-600 p-2 rounded-md">
            <h4 className="text-white font-semibold mb-1">Action Required:</h4>
            <p className="text-gray-200">
              {action === "UPDATE_RATING" ? "Update Professor Rating" : "Add Professor Review"}
            </p>
            <p className="text-gray-200 text-sm mt-1">
              Use the format: 
              <br />
              {action === "UPDATE_RATING" ? "ACTION:UPDATE_RATING NEW_RATING:X.X" : "ACTION:ADD_REVIEW REVIEW:Your review text"}
            </p>
          </div>
        )}
      </div>
    );
  };