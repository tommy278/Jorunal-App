import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

interface SearchModalProps {
    open: boolean;
    onClose: () => void;
    onSearch: (query: string) => void;
    results: React.ReactNode[];
    query: string;
    setQuery: (value: string) => void;
    title?: string;
}

const style = {
    position: "absolute" as const,
    top: "10%",
    left: "50%",
    transform: "translate(-50%, 0)",
    width: "50%",
    maxHeight: "70%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    overflowY: "auto",
};

export default function SearchModal({
    open,
    onClose,
    onSearch,
    results,
    query,
    setQuery,
    title = "Search",
}: SearchModalProps) {
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setQuery(value);
        onSearch(value);
    }

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={style} onClick={(e) => e.stopPropagation()}>
                <Typography variant="h6" mb={2}>
                    {title}
                </Typography>
                <TextField
                    fullWidth
                    placeholder="Type to search..."
                    value={query}
                    onChange={handleChange}
                />
                <Box mt={3}>
                    {results.map((r) => (
                        <div
                            key={(r as any).key}
                            onClick={onClose} // collapse modal when clicking result
                        >
                            {r}
                        </div>
                    ))}
                </Box>
            </Box>
        </Modal>
    );
}