import {useNavigate, useSearchParams} from "react-router-dom";
import "./style.css";
import {useDispatch, useSelector} from "react-redux";
import {addVocabulary, findVocabulary, updateVocabulary} from "../../../../Redux/apiVocabularyRequest";
import {useState} from "react";

const AddVocabulary = () => {
    const [original, setOriginal] = useState("");
    const [translate, setTranslate] = useState("");
    const [description, setDescription] = useState("");
    const [searchParams] = useSearchParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const idUser = useSelector(state => state.auth.login?.currentUser.user._id);
    const vocabulary = useSelector(state => state.vocabulary.vocabulary.result?.allVocabularies);
    const idWord = searchParams.get('id');
    const language = searchParams.get('language');

    const handleSubmit = (e) => {
        e.preventDefault();
        const newVocabulary = {
            language: language,
            original: original,
            translate: translate,
            description: description,
            idUser: idUser,
        }
        if(!idWord){
            addVocabulary(dispatch, navigate, newVocabulary, language);
        }else{
            updateVocabulary(dispatch,navigate, newVocabulary, idWord, language);
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <h1>{idWord ? ("Edit") : (`Add Vocabulary ${searchParams.get('language')}`)}</h1>
                <p>Original</p>
                <input type="text" onChange={e => setOriginal(e.target.value)} placeholder={idWord?(`${vocabulary.original}`):("Original")}/>
                <p>Translate</p>
                <input type="text" name={'translate'} onChange={e => setTranslate(e.target.value)} placeholder={idWord?(`${vocabulary.translate}`):("Translated")}/>
                <p>Description</p>
                <input type="text" name={'description'} onChange={e => setDescription(e.target.value)} placeholder={idWord?(`${vocabulary.description}`): ('Description')}/>
                <button type={"submit"}>{idWord ? ("Edit") : "Add"}</button>
            </form>
        </>
    )
};

export default AddVocabulary;
