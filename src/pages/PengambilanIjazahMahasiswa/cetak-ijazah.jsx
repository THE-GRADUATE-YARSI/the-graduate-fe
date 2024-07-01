import { useLocation } from "react-router-dom";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import { jwtDecode } from "jwt-decode";

const styles = StyleSheet.create({
  container: {
    padding: 30,
    fontSize: 11,
  },
  heading: {
    textAlign: "center",
    fontSize: 16,
    marginBottom: 20,
    textDecoration: "underline",
    fontWeight: "bold",
  },
  section: {
    marginBottom: "10px",
    lineHeight: "1.4",
    display: "flex",
    gap: "5px",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 5,
  },
  label: {
    width: "35%",
    fontWeight: "bold",
  },
  colon: {
    width: "5%",
  },
  value: {
    width: "60%",
  },
  signature: {
    marginTop: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    lineHeight: 1.2,
  },
  signatureText: {
    textAlign: "right",
    fontSize: 11,
  },
  bold: {
    fontWeight: "bold",
  },
});

const CetakIjazah = () => {
  const location = useLocation();
  const data = location.state;
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const { npm, first_name, last_name } = decodedToken;

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "long", year: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", options);
  };

  return (
    <PDFViewer style={{ width: "100%", height: "100vh" }}>
      <Document>
        <Page size="A4" style={styles.container}>
          <View>
            <View>
              <Text style={styles.heading}>
                SURAT PERNYATAAN PENGAMBILAN IJAZAH
              </Text>
              <View style={styles.section}>
                <View style={styles.row}>
                  <Text style={styles.label}>Nama Lengkap</Text>
                  <Text style={styles.colon}>:</Text>
                  <Text
                    style={styles.value}
                  >{`${first_name} ${last_name}`}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>NPM</Text>
                  <Text style={styles.colon}>:</Text>
                  <Text style={styles.value}>{npm}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Agama</Text>
                  <Text style={styles.colon}>:</Text>
                  <Text style={styles.value}>{data.religion}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Tempat/Tanggal Lahir</Text>
                  <Text style={styles.colon}>:</Text>
                  <Text style={styles.value}>
                    {data.birth_place} / {formatDate(data.birth_date)}
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Jenis Kelamin</Text>
                  <Text style={styles.colon}>:</Text>
                  <Text style={styles.value}>{data.gender}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Alamat</Text>
                  <Text style={styles.colon}>:</Text>
                  <Text style={styles.value}>{data.address}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Handphone</Text>
                  <Text style={styles.colon}>:</Text>
                  <Text style={styles.value}>{data.phone_number}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Program Studi</Text>
                  <Text style={styles.colon}>:</Text>
                  <Text style={styles.value}>{data.major}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Jenjang</Text>
                  <Text style={styles.colon}>:</Text>
                  <Text style={styles.value}>{data.level}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Tanggal Lulus</Text>
                  <Text style={styles.colon}>:</Text>
                  <Text style={styles.value}>
                    {formatDate(data.commencement_date)}
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>IPK</Text>
                  <Text style={styles.colon}>:</Text>
                  <Text style={styles.value}>{data.gpa}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Nama Ayah</Text>
                  <Text style={styles.colon}>:</Text>
                  <Text style={styles.value}>{data.dad}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Nama Ibu</Text>
                  <Text style={styles.colon}>:</Text>
                  <Text style={styles.value}>{data.mother}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Alamat Orang Tua</Text>
                  <Text style={styles.colon}>:</Text>
                  <Text style={styles.value}>{data.parent_address}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Telepon Orang Tua</Text>
                  <Text style={styles.colon}>:</Text>
                  <Text style={styles.value}>{data.parent_telp}</Text>
                </View>
              </View>
            </View>
            <View style={styles.section}>
              <Text>
                Dengan ini menyatakan bahwa saya bersedia untuk mengambil ijazah
                atas nama saya paling lambat 6 (enam) bulan sejak tanggal
                kelulusan wisuda saya dengan melengkapi persyaratan yang telah
                ditentukan. Apabila ijazah tersebut tidak diambil dalam jangka
                waktu yang telah ditentukan, maka saya bersedia menerima segala
                resiko (kehilangan atau kerusakan).
              </Text>
              <Text>
                Demikian pernyataan ini saya buat dengan sadar dan tanpa tekanan
                dari pihak manapun.
              </Text>
            </View>
            <View style={styles.signature}>
              <Text style={styles.signatureText}>
                Jakarta, {formatDate(new Date())}
              </Text>
              <Text style={styles.signatureText}>Yang membuat pernyataan</Text>
              <Text style={[styles.signatureText, { marginTop: 60 }]}></Text>
              <Text style={styles.signatureText}>Materai</Text>
              <Text style={styles.signatureText}>10.000</Text>
              <Text style={{ marginTop: "15px" }}>{first_name}</Text>
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default CetakIjazah;
