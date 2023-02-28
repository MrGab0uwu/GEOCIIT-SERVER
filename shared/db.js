const supabase = require('./supabase')

exports.saveLocation = async (location) => {
  const { data, error } = await supabase
    .from('gps-data').insert(location)
  if (error) throw error
  return data
}

exports.getLocationsById = async (boardId) => {
  const { data, error } = await supabase
    .from('gps-data').select('*').eq('boardId', boardId)
  if (error) throw error
  return data
}

exports.getLocationsByType = async (type) => {
  const { data, error } = await supabase
    .from('gps-data').select('*').eq('type', type)
  if (error) throw error
  return data
}

exports.getAllLocations = async () => {
  const { data, error } = await supabase
    .from('gps-data').select('*')
  if (error) throw error
  return data
}
