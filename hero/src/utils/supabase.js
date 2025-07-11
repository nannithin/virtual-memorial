const { createClient } = require("@supabase/supabase-js")

const supabase = createClient('https://khdgooikwwhjsqkakhmt.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtoZGdvb2lrd3doanNxa2FraG10Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM2Njc5NTksImV4cCI6MjA1OTI0Mzk1OX0.wEvzrcmXwmyPBc-XQpmj8wAAMyNKB2eTF4xbPKEqxIM')


const supaBase = async (file, name) => {
    const fileExt = file.name.split('.').pop();
    const filePath = `tributes/${name}-${Date.now()}.${fileExt}`;

    const { data, error } = await supabase.storage
        .from('triimg') 
        .upload(filePath, file);

    if (error) throw error;

    const { data: publicUrlData } = supabase
    .storage
    .from("triimg")
    .getPublicUrl(filePath);
    
  return publicUrlData.publicUrl;
}

export default supaBase;