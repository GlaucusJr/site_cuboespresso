const SUPABASE_URL = 'https://zrqfqigboekporcfhrlf.supabase.co'
const SUPABASE_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpycWZxaWdib2VrcG9yY2ZocmxmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyMzQ2OTQsImV4cCI6MjA2OTgxMDY5NH0.9nImNPFq-OWPWSOEtv1yJuBl68BJucCuU7jpGmyqCtY'

async function buscarProdutos() {
  const resposta = await fetch(`${SUPABASE_URL}/rest/v1/produtos?select=*`, {
    headers: {
      apikey: SUPABASE_API_KEY,
      Authorization: `Bearer ${SUPABASE_API_KEY}`
    }
  })
  return await resposta.json()
}

async function buscarProdutoPorId(id) {
  const resposta = await fetch(`${SUPABASE_URL}/rest/v1/produtos?id=eq.${id}&select=*`, {
    headers: {
      apikey: SUPABASE_API_KEY,
      Authorization: `Bearer ${SUPABASE_API_KEY}`
    }
  })
  const resultado = await resposta.json()
  return resultado[0]
}
