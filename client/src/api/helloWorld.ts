import AxiosInstance from 'utils/axios'

export const helloWorldApi = async () => {
  try {
    const response = await AxiosInstance.get('/')
    return response.data
  } catch (error) {
    return error
  }
}
